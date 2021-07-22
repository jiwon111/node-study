const Sequelize = require('sequelize');

module.exports = class Domain extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            host:{//인터넷 주소
                type: Sequelize.STRING(80),
                allowNull:false,
            },
            type:{//도메인 종류
                type:Sequelize.ENUM('free', 'premium'),//둘 중 하나 선택
                allowNull:false,
            },
            ClientSecret:{//클라이언트 비밀 키
                type:Sequelize.UUID,//랜덤 문자열
                allowNull:false,
            },
        }, {
            sequelize,
            timestamps:true,
            paranoid:true,
            modelName:'Domain',
            tableName:'domains',
        });
    }

    static associate(db){
        db.Domain.belongsTo(db.User);//일대다 관계
    }
};