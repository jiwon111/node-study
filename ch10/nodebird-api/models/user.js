const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            email:{
                type:Sequelize.STRING(40),
                allowNull:true,
                unique:true,
            },
            nick:{
                type:Sequelize.STRING(15),
                allowNull :false,
            },
            password:{
                type:Sequelize.STRING(100),
                allowNull:true,
            },
            provider:{
                type:Sequelize.STRING(10),
                allowNull:false,
                defaultValue: 'local',//local이면 로컬 로그인, kakao면 카카오 로그인
            },
            snsId:{
                type:Sequelize.STRING(30),
                allowNull:true,
            },
        }, {
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:true,
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }

    static associate(db){
        db.User.hasMany(db.Post);//User, Post 모델은 1:N 관계
        db.User.belongsToMany(db.User, {//User, User 모델은 N:M 관계
            foreignKey:'followingId',//사용자 아이디 구분
            as:'Followers',//foreignKey와 반대되는 모델을 가리킴
            through:'Follow',//생성할 모델 이름
        });
        db.User.belongsToMany(db.User, {
            foreignKey:'followerId',//사용자 아이디 구분
            as:'Followings',
            through:'Follow',
        });
        db.User.hasMany(db.Domain);
    }
};