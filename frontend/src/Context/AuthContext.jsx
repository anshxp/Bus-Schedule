import { createContext,useContext,useState,useEffect, Children } from "react";

const AuthContext=createContext();

export const useAuth=()=>{
    const context=useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider=({children})=>{
    const [admin,setAdmin]=useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        checkAuthstatus();
    },[]);
    const checkAuthstatus=async()=>{
        try{
            const token=localStorage.getItem('admintoken');
            if(token){
                const response=await fetch('http://localhost:3000/admin/verify',{
                    credentials: 'include',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if(response.ok){
                    const data=await response.json();
                    if(data.success){
                        setAdmin(data.admin);
                    } else {
                        localStorage.removeItem('admintoken');
                        setAdmin(null);
                    }
                }
                else{
                    localStorage.removeItem('admintoken');
                    setAdmin(null);
                }
            }
        }
        catch (error) {
            localStorage.removeItem('admintoken');
            setAdmin(null);
        } finally {
            setLoading(false);
        }
    }
    const login=async(email,password)=>{
        try{
            const response=await fetch('http://localhost:3000/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials: 'include',
                body:JSON.stringify({email,password})
            }) ;
            const data = await response.json();
            
            if (data.success && data.token) {
                localStorage.setItem('admintoken', data.token);
                setAdmin(data.admin || { id: 'admin' });
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    };
    const logout = () => {
        localStorage.removeItem('admintoken');
        setAdmin(null);
    };
    const value = {
        admin,
        loading,
        login,
        logout,
        isAuthenticated: !!admin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
