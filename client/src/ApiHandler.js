import btoa from 'btoa';
import axios from 'axios';

/* 
  So this class is the API handler, so instead of having really long methods inside each of the components, I moved
  all the functions that connect to API within this ApiHandler class, these methods make requests to the API with the given data
  and simply just return the data from the API, the rest of the functionality is taken care of inside the respective components
*/


class ApiHandler {

    /**
     * Get the user value.
     * @param {userEmail} - users email address
     * @param {userPassword} - users password
     * @return {user} The user data
     */
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
  

  /**
     * Create a new user
     * @param {firstName} - users first name
     * @param {lastName} - users lastname
     * @param {userEmail} - users email address
     * @param {userPassword} - users password
     * @return {confirmation} The user data
     */
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


  /**
     * Updating an existing course
     * @param {emailAddress} - users email address
     * @param {password} - users password
     * @param {courseId} - course to be modified
     * @param {...courseData} - data to be used for the new course
     * @param {userId} - owner of course
     * @return {newCourseData} The new course data
     */
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

  /**
     * Delete an existing course.
     * @param {userEmail} - users email address
     * @param {userPassword} - users password
     * @param {courseId} - owner of course
     * @return {API response} whether or not deletion of the course was successful
     */
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

  /**
     * Create a new course
     * @param {emailAddress} - users email address
     * @param {password} - users password
     * @param {...courseData} - data to be used for the new course
     * @param {userId} - owner of course
     * @return {courseData} a confirmation that the new course was created
     */
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