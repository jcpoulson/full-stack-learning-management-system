import btoa from 'btoa';
import axios from 'axios';

/* 
  So this class is the API handler, so instead of having really long methods inside each of the components, I moved
  all the functions that connect to API within this ApiHandler class, these methods make requests to the API with the given data
  and simply just return the data from the API, the rest of the functionality is taken care of inside the respective components
*/


class ApiHandler {

    signIn = async (userEmail, userPassword) => {
        const encodedCredentials = btoa(`${userEmail}:${userPassword}`);
			let config = {
				method: 'get',
				url: 'http://localhost:5000/api/users',
				headers: { 
					'Authorization': `Basic ${encodedCredentials}`
				}
			};
		let request = await axios(config)
        return request.data;     
    }

	signUp = async (firstName, lastName, emailAddress, password) => {
		let data = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "emailAddress": emailAddress,
            "password": password
          });
          
          let config = {
            method: 'post',
            url: 'http://localhost:5000/api/users',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          let request = await axios(config)
		      return request.data;
	}

	updateCourse = async (emailAddress, password, courseId, courseTitle, courseDescription, estimatedTime, materialsNeeded, userId) => {
		const encodedCredentials = btoa(`${emailAddress}:${password}`);
        let data = JSON.stringify({
            "id": courseId,
            "title": courseTitle,
            "description": courseDescription,
            "estimatedTime": estimatedTime,
            "materialsNeeded": materialsNeeded,
            "userId": userId
          });
          
          let config = {
            method: 'put',
            url: `http://localhost:5000/api/courses/${courseId}`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Basic ${encodedCredentials}`
            },
            data : data
          };
          let request = await axios(config)
		      return request;
	}

  deleteCourse = async (userEmail, userPassword, courseId) => {
    const encodedCredentials = btoa(`${userEmail}:${userPassword}`);
        let config = {
            method: 'delete',
            url: `http://localhost:5000/api/courses/${courseId}`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Basic ${encodedCredentials}`
            }
          };
          
        let request = await axios(config);
        return request.data;
  }


  createCourse = async (emailAddress, password, courseTitle, courseDescription, estimatedTime, materialsNeeded, userId) => {
    const encodedCredentials = btoa(`${emailAddress}:${password}`);
        
        let data = JSON.stringify({
            "title": courseTitle,
            "description": courseDescription,
            "estimatedTime": estimatedTime,
            "materialsNeeded": materialsNeeded,
            "teacherId": userId
          });
          
          let config = {
            method: 'post',
            url: 'http://localhost:5000/api/courses',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Basic ${encodedCredentials}`
            },
            data : data
          };
          
        let request = await axios(config);
        return request;
  }
}


export default ApiHandler;