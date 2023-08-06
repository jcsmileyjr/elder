# Developer Documentation

### Objective: 
This web app's end goal is to allow multiple people to contribute to the care of a loved one.

### Site Map
1. **Landing Page:** Care givers can log in with the elder's phone number or create a new elder account. 
2. **Content:** Care givers can view past interactions or essential tasks to care for the elder. Care givers can also start a new "create interaction" process. 
3. **Create interaction entry:** A care giver can create a new interaction (date, description, and name).
4. **Create Account:** A new elder account can be created with name, phone number, and (optional) list of essential task to help take care of them.

### Expected User Journey
1. Care giver creates an account with name, phone number, and one essential task for each daily, weekly, and monthly time frequencies. The care giver then creates an entry for today.
2. Next day, the care giver log-ins with the elder phone number and create an new entry with today interaction.  

### Data flow
There are 2 local storage data storage states:
* Elder-test-data
* Elder-data

Data flow flow for "Account creation" and "Interaction entry creation"
* Data is saved from each input element to the page state.
* When the user press the "Done" button, the data is bundle into an object and saved to both local storage data states. 
* The user is relocated to the "ViewEntries" page which loads the "Elder-data"


### Data schema example
    {
        "elderName" : "Jane Smith",
        "phoneNumber" : "4445556666",
        "activities" : [
            {"date":"June 1st 2023", "message":"Visit doctor office, pharmacy, and grocery store.", "writer":"Daugher Meme", "entryID":101},
            {"date": "May 27th 2023", "message":"Visited for breakfast and to yardwork", "writer":"Cousin Mane", "entryID":102}
        ],
        "essentialTasks" : [
            {
              "type":"Daily",
              "tasks":[
                "Medication: high blood pressure, gout, Prozac",
                "Meals: lactose intolerance, alcohol & excessive sugar inflames gout",
                "Feed and Water: dog food is on shelf in backyard shed"
              ]
            }
        ]
    }