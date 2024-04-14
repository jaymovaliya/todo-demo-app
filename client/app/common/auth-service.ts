export const signUp = async (values: any) => {
    try {
        const response = await fetch('http://localhost:9091/auth/signup', {
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
        const response = await fetch('http://localhost:9091/auth/login', {
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