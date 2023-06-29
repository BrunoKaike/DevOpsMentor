class DevOpsLearningPoint {
    constructor(id, userId, description, theme, devopsSpecif, links = 0) {
      this.id = id;
      this.userId = userId;
      this.description = description;
      this.theme = theme;
      this.devopsSpecif = devopsSpecif;
      this.links = links;
    }
  }
  
  module.exports = DevOpsLearningPoint;
  