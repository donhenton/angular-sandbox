angular sandbox-sandbox
================

Angular restaurant application

<h3>Server</h3>
The server requires nodejs and is in the server folder its location
is http://localhost:6080/restaurant

<h3>Application</h3>

This is a angular application for CRUD operations on restaurants with
reviews. The root url is defined in s script in the index.html page


The master branch is currently the up to date branch for the code 
going forward. Tags do not contain the latest code.


the default location for the node server install is /usr/local/bin
/usr/local/lib/modules for the libraries, edit your bash_profile to set the
variable NODE_PATH to point to this directory

in netbeans install the nodejs plugin, search for Options in the search
option for Netbeans and find the options screen set the command to launch 
node to :

export NODE_PATH=/usr/local/lib/node_modules;
cd ${workingdir};
/usr/local/bin/node ${selectedfile};