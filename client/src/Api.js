import Cookies from 'js-cookie';
import btoa from 'btoa';
import axios from 'axios';
import setUser from './App';
import setStatePassword from './App';


export default class Api {
    signIn = (userEmail, userPassword) => {
        const encodedCredentials = btoa(`${userEmail}:${userPassword}`);
        let config = {
            method: 'get',
            url: 'http://localhost:5000/api/users',
            headers: { 
                'Authorization': `Basic ${encodedCredentials}`
            }
            };
            
            axios(config)
            .then(response => {
                console.log(response.data);
            //setUser(response.data);
            Cookies.set('authenticatedUser', JSON.stringify(response.data), { expires: 1 });
            })
            .catch(function (error) {
            console.log(error);
            });
    
            //setStatePassword(userPassword); // this adds the password to application state
    }
    
    
    test = () => {
        setUser('dude')
    }
}
