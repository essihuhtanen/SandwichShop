db.auth("admin_user", "admin_pass");

db = db.getSiblingDB('mongo_database');

db.createUser({
    user: 'test_user',
    pwd: 'test_password',
    roles: [
        {
            role: 'readWrite',
            db: 'mongo_database'
        }
    ]
});

db.auth("test_user", "test_password");

db.createCollection('user_collection');
db.createCollection('toppings');
db.createCollection('sandwiches');
db.createCollection('orders');

db.user_collection.insertMany([
    {
        "id": 1,
        "username": "testUser1",
        "email": "testuser1@gmail.com",
        "password": "$2a$10$O8oAuM8J68TeUPl.KvcxqOhQMJlozDtcIf.GSKgVfHFJJeZ6OsLP6"
    },
    {
        "id": 2,
        "username": "testUser2",
        "email": "testuser2@gmail.com",
        "password": "$2a$10$TzVO.M35fgKerAZdzYYI/uLbDAqUpY8mL6MW7Sy8TdruSXKKhV1qm"
    },
    {
        "id": 3,
        "username": "testUser3",
        "email": "testuser3@gmail.com",
        "password": "$2a$10$S.4eGAvjC/DSX69KUK6mQOP.wa2vEyCGqcmkSKuacmBVy59RX106G"
    }
]);


db.toppings.insertMany([
    {
        "id" : 1,
        "name" : "hummus"
    }, 
    {
        "id" : 2,
        "name" : "avocado"
    }, 
    {
        "id" : 3,
        "name" : "egg"
    }, 
    {
        "id" : 4,
        "name" : "feta"
    }, 
    {
        "id" : 5,
        "name" : "tomato"}, 
    {
        "id" : 6,
        "name" : "cucumber"
    }, 
    {
        "id" : 7,
        "name" : "cheese"
    },
    {
        "id" : 8,
        "name" : "mayonnaise"
    }
]);

db.sandwiches.insertMany([
    {
        "id" : 1,
        "name" : "Vegan Megan",
        "toppings" : 
            [
                {
                    "id" : 1,
                    "name" : "hummus"
                }, 
                {
                    "id" : 2,
                    "name" : "avocado"
                }
            ],
        "breadType" : "oat"
    },
    {
        "id" : 2,
        "name" : "Fetalicious",
        "toppings" : 
            [
                {
                    "id" : 3,
                    "name" : "egg"
                }, 
                {
                    "id" : 4,
                    "name" : "feta"
                },
                {
                    "id" : 5,
                    "name" : "tomato"
                }
            ],
        "breadType" : "rye"
    },
    {
        "id" : 3,
        "name" : "Mayomber",
        "toppings" : 
            [
                {
                    "id" : 6,
                    "name" : "cucumber"
                }, 
                {
                    "id" : 7,
                    "name" : "cheese"
                },
                {
                    "id" : 8,
                    "name" : "mayonnaise"
                }
            ],
        "breadType" : "wheat"
    }
]);