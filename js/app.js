document.getElementById("searchButton").addEventListener("click", async () => {
  const username = document.getElementById("usernameInput").value.trim();
  const errorMessage = document.getElementById("errorMessage");

  if (username === "") {
    errorMessage.classList.remove("hidden");
    return;
  } else {
    errorMessage.classList.add("hidden");
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (response.status === 404) {
      alert("User not found");
      return;
    }

    document.getElementById("profileCard").classList.remove("hidden");
    document.getElementById("profileImage").src = data.avatar_url;
    document.getElementById("profileName").innerText = data.name || data.login;
    document.getElementById("profileUsername").innerText = `@${data.login}`;
    document.getElementById("profileBio").innerText =
      data.bio || "No bio available";
    document.getElementById("followersCount").innerText = data.followers;
    document.getElementById("followingCount").innerText = data.following;

    document.getElementById("followButton").addEventListener("click", () => {
      window.open(`https://github.com/${data.login}`, "_blank");
    });

    document.getElementById("usernameInput").value = "";
  } catch (error) {
    console.error("Error fetching the GitHub profile:", error);
  }
});
