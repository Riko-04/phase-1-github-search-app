document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        searchUsers(searchTerm);
      }
    });
  
    function searchUsers(searchTerm) {
      const url = `http~s://api.github.com/search/users?q=${searchTerm}`;
      const headers = {
        "Accept": "application/vnd.github.v3+json"
      };
  
      fetch(url, { headers })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          displayUsers(data.items);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  
    function displayUsers(users) {
      userList.innerHTML = "";
      users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <img src='${user.avatar_url}' alt='${user.login}' width='50' height='50'>
          <a href='${user.html_url}' target='_blank'>${user.login}</a>
        `;
        listItem.addEventListener("click", () => {
          getUserRepos(user.login);
        });
        userList.appendChild(listItem);
      });
    }
  
    function getUserRepos(username) {
      const url = `https://api.github.com/users/${username}/repos`;
      const headers = {
        "Accept": "application/vnd.github.v3+json"
      };
  
      fetch(url, { headers })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((repos) => {
          displayRepos(repos);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = "";
      repos.forEach((repo) => {
        const listItem = document.createElement("li");
        listItem.textContent = repo.full_name;
        reposList.appendChild(listItem);
      });
    }
  });
  