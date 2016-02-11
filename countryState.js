/*
* Author:       Michael John Grove
* Version:      0.1 (02 March 2008)
* Description:  Javascript Country DropDown selection with full Province/State selection
*               Fast XHTML compliant Country/State selection list from XML file
* License:      Creative Commons Attribution-Share Alike 2.5 South Africa License (http://creativecommons.org/licenses/by-sa/2.5/za/)
*/

// Load XML file before html loads
var xmlDoc;

// For IE based browsers (tested under IE6 and IE7):
if (window.ActiveXObject)
{
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");

    // Turn off asynchronus download.
    // Load the entire file before trying to do anything with it.
    xmlDoc.async=false;

    //load the country/state XML file windows only
    xmlDoc.load("country_state.xml");
}
// For other browsers (Netsacpe/Firefox/Chrome):
else if (document.implementation && document.implementation.createDocument)
{
    //Removed line to fix Google Chrome bug (26/01/2009):- xmlDoc = document.implementation.createDocument("","doc",null);
    //Replaced with below script
    var xmlhttp = new window.XMLHttpRequest();

    //load the country/state XML file other browsers
    xmlhttp.open("GET","country_state.xml",false);

    xmlhttp.send(null);
    xmlDoc = xmlhttp.responseXML.documentElement;

}
else
{
        // The 'something fails' alert!
        alert('Your browser is unable to handle this script');
}

// Populate selected dropdown list with data from XML file
// (<option value="County/StateName">County/StateName</option>)
// Function used for both Country Fill and State Fill
function fillList(selectbox,text,value)
{
    var optionValue = document.createElement("option");
    optionValue.text = text;
    optionValue.value = value;
    selectbox.options.add(optionValue);
}

// Populate Country list on page load
// Requires: <body onload="fillCountryList();"> on HTML page
function fillCountryList ()
{
    // Get country element ID
    var countryList = document.getElementById("cboCountry");

    // Clear any current values in select box
    // If JavaScript isn't working existing text will remain
    for (var x = countryList.options.length-1; x >-1; x--)
    {
        countryList.options[x] = null;
    }
    // Fill Country name Array from XML file
    var countryNames = xmlDoc.getElementsByTagName("country");
    // Gets total Number of countries in XML file
    var numberOfCountries = countryNames.length;

    // Loop through Country name Array and populate country select
    for (var i=0; i <numberOfCountries; i++)
    {
        var currentCountry =  countryNames[i].getAttribute("name");
        fillList(countryList,currentCountry,currentCountry);
    }
}

// Populate State/Province list on Country change
function fillStateList()
{
    // Get State/Province element ID
    var stateList = document.getElementById("cboState")

    // Clear any current values in select box
    // If JavaScript isn't working existing text will remain
    for (var x = stateList.options.length-1; x >-1; x--)
    {
        stateList.options[x] = null;
    }

    // Get currently selected ID from country element ID
    var countryListSelected = document.getElementById("cboCountry").selectedIndex;
    // Get number of states for current selected Country (populates Array)
    var numberStates = xmlDoc.getElementsByTagName("country")[countryListSelected].getElementsByTagName("state").length;

   // Loop through States/Province Array and populate State/Province selection for current Country
    for (var i=0; i < numberStates; i++)
    {
        var currentState =  xmlDoc.getElementsByTagName("country")[countryListSelected].getElementsByTagName("state")[i].firstChild.nodeValue;
        fillList(stateList,currentState,currentState);
    }

}