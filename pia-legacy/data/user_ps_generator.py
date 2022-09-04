import random
import string
import json

# Simple python script to the generate list with logins and passwords

## Generates usernames of PIA workers
def usernameGenerator():
    n = 3
    upper = string.ascii_uppercase
    holder = random.sample(upper,n)
    username = "".join(holder)
    return username
## Generates passwords for PIA workers
def passwordGenerator():
    n = random.randint(7,13)
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    num = string.digits
    all =lower+upper+num
    holder = random.sample(all,n)
    password = "".join(holder)
    return password


usernames = []
passwords = []
for x in range(1,50):
    usernames.append(usernameGenerator())
    passwords.append(passwordGenerator())

usernames.append("JCD")
passwords.append(passwordGenerator())
usernames.sort()

user_dict = dict(zip(usernames,passwords))
user_dict["JCD"] = "JensSummer2014" ## Adds passwords of JCD, which is going to be found by users.

print(user_dict)

json_object = json.dumps(user_dict, indent=4)

with open("platform\pia-legacy\data\employees.json", "w") as file:
    file.write(json_object)





