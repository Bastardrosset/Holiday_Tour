// import axios from 'axios';


export const signup = async (name, email, password, passwordConfirm) => {
    console.log(email, password);
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm,
            },
        })
    } catch (err) {
        console.log(err)
    }
};
    