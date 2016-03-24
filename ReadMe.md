#Raspberry PI Install steps

1. Get on the latest for the package management system  
  * `sudo apt-get update`
2. Git  
  * `sudo apt-get install git`
3. Curl, needed to install the latest version of node
  * `sudo apt-get install curl`
4. Node, Point towards the proper package version and then install nodejs
  * `curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -`  
  * `sudo apt-get install -y nodejs`
5. Mongo [Install Instructions for different versions](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian/), point towards the proper package repo
  * `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927`
  * `echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list`
  * `sudo apt-get update`
  * `sudo apt-get install -y mongodb-org`

  
#Configuration and setup
* Start Mongodb as a service
  * `sudo service mongod start` 
* Clone and setup git repo
  * `git clone https://github.com/rkrauskopf/stationSuite.git`
  * `cd stationSuite`
  * `npm install`
* Run files as desired. Use _mongo shell_ by running the `mongo` command