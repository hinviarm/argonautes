var API_URL = "http://localhost:5000/api/v1";

var config = getAppConfiguration();

function getAppConfiguration() {
  return {
    body: document.body,
    membersContainer: document.getElementById('members'),
    addMemberButton: document.getElementById('addMember')
  }
}

async function appLoad() {
  config.addMemberButton.addEventListener('click', async function () {
    let name = document.getElementById('name').value;
    if (name && name !== '') {
      await addNewMember(name);
      loadListMembers();
    }
  });

  loadListMembers();
}


function renderListMembers(items) {
  $container = config.membersContainer;

  // remove $container children
  while ($container.firstChild) {
    $container.removeChild($container.firstChild);
  }

  items.forEach(function (item) {
    var $row = document.createElement('div');
    $row.classList.add('member-item');
    $row.textContent = item.name;
    if (item.id) {
      $row.id = 'row-' + item.id;
    }
    $container.appendChild($row);
  });
}

async function loadListMembers() {
  const members = await getListMembers();
  renderListMembers(members);
}

function getListMembers() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      contentType: 'application/json',
      headers: {
        Accept: 'application/json'
      },
      url: API_URL + '/members'
    }).then(function (data) {
      resolve(data);
    }, function (err) {
      console.error(err);
      reject(err);
    });
  });
}

async function addNewMember(name) {
  var data =  { name };
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      headers: {
        Accept: 'application/json'
      },
      url: API_URL + '/members',
      dataType: 'json',
      data: JSON.stringify(data)
    }).then(function (data) {
      resolve(data);
    }, function (err) {
      console.error(err);
      reject(err);
    });
  });
}

document.addEventListener('DOMContentLoaded', appLoad, true);
