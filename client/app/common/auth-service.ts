export const signUp = async (values: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            if(errorData.code === "USER_ALREADY_EXISTS") {
                return { 
                    error: true,
                    email: errorData.message
                };
            }
        }
        return {
            error: false
        };
    } catch (error) {
        console.error('Signup error:', error);
    }
}

export const login = async (values: any) => {
    try {
        console.log(process.env);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            if(errorData.code === "INVALID_USERNAME_OR_PASSWORD") {
                return { 
                    error: true,
                    password: errorData.message
                };
            }
        }
        const result = await response.json();
        localStorage.setItem('token', result.token);
        return {
            error: false
        };
    } catch (error) {
        console.error('Login error:', error);
    }
}