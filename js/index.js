/* jshint esversion: 8 */
document.addEventListener("DOMContentLoaded", function () {
  var userData = [];
  var uri = 'https://jsonplaceholder.typicode.com/users';
  async function storeData() {
    userData = await fetchData();
    //console.log(userData[0]);
    initialValues();
  }
  function fetchData() {
    return new Promise(function (resolve, reject) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open('GET', uri);
      xmlHttp.responseType = 'json';
      xmlHttp.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xmlHttp.response);
        } else {
          reject({
            status: this.status,
            statusText: xmlHttp.statusText
          });
        }
      };
      xmlHttp.onerror = function () {
        reject({
          status: this.status,
          statusText: xmlHttp.statusText
        });
      };
      xmlHttp.send();
    });
  }
  storeData();

  function removeAllChild(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function initialValues() {
    var user_div = document.getElementById('user_div');
    removeAllChild(user_div);
    var sub_div = document.createElement(sub_div);
    sub_div = genTable(sub_div);
    user_div.appendChild(sub_div);
  }

  function genTable(sub_div) {
    sub_div.classList.add('table-view');
    var tableData = document.createElement('table');
    tableData.classList.add('table');
    var theadData = tableData.createTHead();
    var trData = document.createElement('tr');
    if (userData.length > 0) {
      for (var key in userData[0]) {
        var th = document.createElement('th');
        if (key === 'id') {
          th.innerHTML = '#';
        } else if (key === 'address') {
          continue;
        } else {
          th.innerHTML = key;
        }
        trData.appendChild(th);
      }
    }
    theadData.appendChild(trData);
    tableData.appendChild(theadData);
    var tbodyData = tableData.createTBody();
    userData.forEach((user) => {
      var trData = document.createElement('tr');
      for (var key in user) {
        var td = document.createElement('td');
        if (key === 'address') {
          continue;
        } else if (key === 'phone') {
          var data = user[key].split(' ');
          td.innerHTML = data[0];
        } else if (key === 'company') {
          td.innerHTML = user[key].name;
        } else if (key === 'website') {
          var web = document.createElement('a');
          web.setAttribute('href', `http://${user[key]}`);
          web.innerHTML = user[key];
          td.appendChild(web);
        } else if (key === 'email') {
          var mail = document.createElement('a');
          mail.setAttribute('href', `mailto:${user[key]}`);
          mail.innerHTML = user[key];
          td.appendChild(mail);
        } else {
          td.innerHTML = user[key];
        }
        trData.appendChild(td);
      }
      tbodyData.appendChild(trData);
    });
    sub_div.appendChild(tableData);
    return sub_div;
  }

  function getGrid(sub_div) {

  }

  function getList(sub_div) {
    
  }

});