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
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if(response.ok){
                    const data=await response.json();
                    setAdmin(data.admin);
                }
                else{
                    localStorage.removeItem('admintoken');
                    setAdmin(null);
                }
            }
        }
        catch (error) {
            console.error('Auth check failed:', error);
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
                body:JSON.stringify({email,password})
            }) ;
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('admintoken', data.token);
                setAdmin(data.admin);
                return { success: true };
            } else {
                return { success: false, message: data.message };
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
