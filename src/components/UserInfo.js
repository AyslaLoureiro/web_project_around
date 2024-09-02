export default class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._nameElement = document.querySelector(userName);
    this._jobElement = document.querySelector(userJob);
    this._avatar = document.querySelector(userAvatar);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatar.getAttribute("src"),
    };
  }
  setUserInfo({ name, job, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._avatar.setAttribute("src", avatar);
  }
}
