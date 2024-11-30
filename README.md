<div align="center">
  <h1 align="center">Task 2</h1>
</div>


  
<h2 align="center">Server Lord</h2>

## Description
In this task we want you to create a basic application that can
- Register a user in your application
- Let the user add tasks to your application which the application will keep track of
- Implement logic for keeping track of whether any task is unresponsive
- Ensure that the system works with minimal latency for a size of 10 users
- Extend this to  work for 100 users

## Hints
- For the application create a basic HTTP server with required HTTP endpoints
- Choose an appropriate database type for persistence (You can use Docker containers to make this easier )
- Design an appropriate schema for user and task
- Test the endpoints using Postman to ensure it works
- Implement logic to keep track of whether a task is dead or alive (i.e., whether it has sent a heartbeat message within the stipulated time interval)

## Points to be Noted
- Every time a user adds a task it must be given the link that the task has to ping
- The logic to monitor the tasks should have minimal latency

## Useful Tips
- Try to implement the most bare-bones application initially
- Try to understand why a certain logic would not be ideal and make changes to solve the issues you believe that approach has and iteratively reach a better solution
- Try to complete as much of the task as you can and make sure to submit whatever work you have implemented ( We are trying to evaluate your logic, not just the final solution )

## Resources
- Express:- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
- Database:- https://medium.com/wix-engineering/how-to-choose-the-right-database-for-your-service-97b1670c5632
- Feel free to use any other libraries to implement your logic for monitoring tasks ( Remember that your application has to check and track different tasks constantly)

## IMPORTANT
Don't hesitate to contact either of us if you have any doubts 

## Submission
- Fork this repository as ServerLordTask2_Name_RollNo
- Add the code files and update the readme file explaining your solution for each of the sub-tasks
- Add us as collaborators
- Contact us after finishing the task 
- Don't make any pull requests
## Deadline 
- December 4th 11:59 P.M 

Start the task as soon as possible as it might take some time to finish this task.
