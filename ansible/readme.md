# How to run

Build image from dockerfile in service folder

Run containers:
docker run --rm --name kontti2 -p23:22 image_name
docker run --rm --name kontti1 -p 22:22 image_name

Run the playbook:
ansible-playbook -i hosts.yaml ansible.yaml -e "ansible_become_password=eee"

# Analysis
Uptime inside a container shows hosts uptime. The kernel does not track uptime for individual containers in this way.
For me most difficult part was trying to make ansible work with the ip addresses of the containers. Had to use localhost instead because i had no time to figure out how to connect to the containers with the ip address. Also i felt like ansible documentation was hard to understand sometimes.

# O1:
PLAY [kontit] **********\*\*\*\***********\*\*\*\***********\*\*\*\***********\*\***********\*\*\*\***********\*\*\*\***********\*\*\*\***********

TASK [Gathering Facts] **********\*\***********\*\*\*\***********\*\***********\***********\*\***********\*\*\*\***********\*\***********
ok: [kontti1]

TASK [uptime] **********\*\*\*\***********\*\*\*\***********\*\*\*\***********\*\***********\*\*\*\***********\*\*\*\***********\*\*\*\***********
changed: [kontti1]

TASK [debug] **********\*\*\*\***********\*\*\*\***********\*\*\*\***********\*\*\***********\*\*\*\***********\*\*\*\***********\*\*\*\***********
ok: [kontti1] => {
"command_output.stdout_lines": [
" 15:43:38 up 9:12, 0 users, load average: 0.08, 0.10, 0.05"
]
}

TASK [Update Git] **********\*\*\*\***********\*\***********\*\*\*\***********\*\***********\*\*\*\***********\*\***********\*\*\*\***********
ok: [kontti1]

PLAY RECAP ************\*\*************\*\*************\*\*************\*************\*\*************\*\*************\*\*************
kontti1 : ok=4 changed=1 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0

# O2:
PLAY [kontit] ************************\*\*\*\*************************\*\*************************\*\*\*\*************************

TASK [Gathering Facts] **********************\*\*\*\***********************\***********************\*\*\*\***********************
ok: [kontti1]

TASK [uptime] ************************\*\*\*\*************************\*\*************************\*\*\*\*************************
changed: [kontti1]

TASK [debug] ************************\*\*\*\*************************\*\*\*************************\*\*\*\*************************
ok: [kontti1] => {
"command_output.stdout_lines": [
" 15:44:55 up 9:13, 0 users, load average: 0.02, 0.07, 0.04"
]
}

TASK [Update Git] ************************\*\*************************\*\*************************\*\*************************
ok: [kontti1]

PLAY RECAP **************************\*\***************************\***************************\*\***************************
kontti1 : ok=4 changed=1 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0

# O3:
PLAY [kontit] ************************\*\*\*\*************************\*\*************************\*\*\*\*************************

TASK [Gathering Facts] **********************\*\*\*\***********************\***********************\*\*\*\***********************
ok: [kontti1]
ok: [kontti2]

TASK [uptime] ************************\*\*\*\*************************\*\*************************\*\*\*\*************************
changed: [kontti1]
changed: [kontti2]

TASK [debug] ************************\*\*\*\*************************\*\*\*************************\*\*\*\*************************
ok: [kontti1] => {
"command_output.stdout_lines": [
" 15:45:39 up 9:14, 0 users, load average: 0.11, 0.09, 0.05"
]
}
ok: [kontti2] => {
"command_output.stdout_lines": [
" 15:45:39 up 9:14, 0 users, load average: 0.11, 0.09, 0.05"
]
}

TASK [Update Git] ************************\*\*************************\*\*************************\*\*************************
ok: [kontti2]
ok: [kontti1]

PLAY RECAP **************************\*\***************************\***************************\*\***************************
kontti1 : ok=4 changed=1 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0
kontti2 : ok=4 changed=1 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0

# O4:

PLAY [kontit] ************************\*\*\*\*************************\*\*************************\*\*\*\*************************

TASK [Gathering Facts] **********************\*\*\*\***********************\***********************\*\*\*\***********************
ok: [kontti2]
ok: [kontti1]

TASK [uptime] ************************\*\*\*\*************************\*\*************************\*\*\*\*************************
changed: [kontti2]
changed: [kontti1]

TASK [debug] ************************\*\*\*\*************************\*\*\*************************\*\*\*\*************************
ok: [kontti1] => {
"command_output.stdout_lines": [
" 15:46:11 up 9:15, 0 users, load average: 0.22, 0.11, 0.06"
]
}
ok: [kontti2] => {
"command_output.stdout_lines": [
" 15:46:11 up 9:15, 0 users, load average: 0.22, 0.11, 0.06"
]
}

TASK [Update Git] ************************\*\*************************\*\*************************\*\*************************
ok: [kontti1]
ok: [kontti2]

PLAY RECAP **************************\*\***************************\***************************\*\***************************
kontti1 : ok=4 changed=1 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0
kontti2 : ok=4 changed=1 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0



