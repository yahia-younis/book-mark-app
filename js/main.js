var Site_Name = document.getElementById("Site_Name");
var Site_URL = document.getElementById("Site_URL");
var Site_desc = document.getElementById("Site_desc");
var site_Search = document.getElementById("site_search");
var no_sites_box = document.getElementById("no_sites_box");
var sites_box = document.getElementById("sites_box");

// bs modal
var myModal = new bootstrap.Modal('#addsite');
var addSiteModal = document.getElementById('addsite');

//modal btn 
var editSiteBtn = document.getElementById("editsitebtn");
var SaveSiteBtn = document.getElementById("SaveSitebtn");

var sites_list;

// check if there is saved site 
if (localStorage.getItem("sites_list") != null) {
  sites_list = JSON.parse(localStorage.getItem("sites_list"));
  no_sites_box.style.display = "none";
  sites_box.style.display = "block";
  displaysites()
} else {
  sites_list = [];
  no_sites_box.style.display = "block";
  sites_box.style.display = "none";
}

// save site and put in arry of abject
function SaveSite() {

  if (sitenamevalidation() == true && siteurlvalidation() == true && webcheck() == true) {
    var site = {
      SiteName: Site_Name.value,
      SiteURL: Site_URL.value,
      Sitedesc: Site_desc.value,
    }
    sites_list.push(site);
    localStorage.setItem("sites_list", JSON.stringify(sites_list));
    displaysites();
    clearform();
    myModal.hide(addSiteModal);
  }
}


// function to display sits
function displaysites() {
  var data = "";
  for (i = 0; i < sites_list.length; i++) {
    data += `<li class="d-flex flex-column py-4">
    <div class="d-flex align-items-center" >
      <div class="d-flex justify-content-around align-items-center">
        <span class="fw-bold">` + [i+1] + `</span> 
        <i class="fa-solid fa-dharmachakra fs-2"></i>
      </div>
      <div class="site-desc">
        <h6 class="site-name fw-bolder m-0">` + sites_list[i].SiteName + `</h6>
        <p class="site desc m-0">` + sites_list[i].Sitedesc + `</p>
      </div>
    </div>
    <div class="site-action text-end">
      <a class="text-muted text-decoration-none" href="` + sites_list[i].SiteURL + `" target="_blank"><i class="fa-solid fa-share-from-square"></i> visit</a>
      <a class="text-success text-decoration-none"  href="#" onclick="editsite(` + [i] + `)" ><i class="fa-solid fa-pen-to-square"></i>Edit</a>
      <a class="text-danger text-decoration-none" href="#" onclick="deletesite(` + [i] + `)" ><i class="fa-solid fa-trash-can"></i>Delete</a>
    </div>
  </li>
  `
  }
  no_sites_box.style.display = "none";
  sites_box.style.display = "block";
  document.getElementById("sites_list").innerHTML = data;
}

// function to edit site 
function editsite(index) {
  Site_Name.value = sites_list[index].SiteName;
  Site_URL.value = sites_list[index].SiteURL;
  Site_desc.value = sites_list[index].Sitedesc;
  myModal.show(addSiteModal);
  document.getElementById("editsitebtn").setAttribute("onclick", "updateSite(" + index + ")");
  editSiteBtn.style.display = "inline"
  SaveSiteBtn.style.display = "none"
}

// updata websits
function updateSite(index) {
  var newSite = {
    SiteName: Site_Name.value,
    SiteURL: Site_URL.value,
    Sitedesc: Site_desc.value,
  }
  sites_list[index] = newSite;
  localStorage.setItem("sites_list", JSON.stringify(sites_list));
  displaysites();
  clearform();
  myModal.hide(addSiteModal);
}

//function to return dufault buttons
function openModal() {
  clearform();
  editSiteBtn.style.display = "none"
  SaveSiteBtn.style.display = "inline"
  document.getElementById("web_exist").style.display = "none";
}

// function to delete site 
function deletesite(index) {
  sites_list.splice(index, 1);
  localStorage.setItem("sites_list", JSON.stringify(sites_list));
  displaysites();
  if (sites_list.length == 0) {
    sites_box.style.display = "none";
    no_sites_box.style.display = "block";
    localStorage.removeItem("sites_list");
  }
}

// function to clear form
function clearform() {
  Site_Name.value = "";
  Site_URL.value = "";
  Site_desc.value = "";
}


// function to search website
function site_search() {
  var searchValue = site_Search.value;
  var reaslt = "";
  for (i = 0; i < sites_list.length; i++) {
    if (sites_list[i].SiteName.toLowerCase().includes(searchValue.toLowerCase())) {
      reaslt += `<li class="d-flex align-items-center row py-4">
    <div class="col-1 d-flex justify-content-around align-items-center">
      <span class="fw-bold">` + [i+1] + `</span> 
      <i class="fa-solid fa-dharmachakra fs-2"></i>
    </div>
    <div class="col-md-7 site-desc">
      <h6 class="site-name fw-bolder m-0">` + sites_list[i].SiteName + `</h6>
      <p class="site desc m-0">` + sites_list[i].Sitedesc + `</p>
    </div>
    <div class="col-3 site-action text-end">
      <a class="text-muted text-decoration-none" href="` + sites_list[i].SiteURL + `" target="_blank"><i class="fa-solid fa-share-from-square"></i> visit</a>
      <a class="text-success text-decoration-none"  href="#" onclick="editsite(` + [i] + `)" ><i class="fa-solid fa-pen-to-square"></i>Edit</a>
      <a class="text-danger text-decoration-none" href="#" onclick="deletesite(` + [i] + `)" ><i class="fa-solid fa-trash-can"></i>Delete</a>
    </div>
  </li>
  `
    }
  }
  document.getElementById("sites_list").innerHTML = reaslt;
}


// function to vaildate website name 
function sitenamevalidation() {
  var vaild = false;
  var regex = /^[a-zA-Z ]{2,20}$/;
  if (regex.test(Site_Name.value)) {
    document.getElementById("Name_alert").style.display = "none";
    document.getElementById("web_exist").style.display = "none";
    vaild = true;
  } else {
    document.getElementById("Name_alert").style.display = "block";
    vaild = false;
  }
  return vaild;
}

// function to vaildate website url 
function siteurlvalidation() {
  var vaild = false;
  var regex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (regex.test(Site_URL.value)) {
    document.getElementById("url_alert").style.display = "none";
    vaild = true;
  } else {
    document.getElementById("url_alert").style.display = "block";
    vaild = false;
  }
  return vaild;
}

// function to check if web is exiest
function webcheck() {
  var vaild = true;
  for (i = 0; i < sites_list.length; i++) {
    if (sites_list[i].SiteName.toLowerCase() == Site_Name.value.toLowerCase()) {
      vaild = false;
      document.getElementById("web_exist").style.display = "block";
    }
  }
  return vaild;
}


