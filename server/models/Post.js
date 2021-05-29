const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}

  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING(255),
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  Post.associate = (models) => {
    Post.belongsTo(models.user);
    Post.belongsToMany(models.user, { through: models.vote });
  };
  return Post;
};
