var GraphQLFloat = require('graphql').GraphQLFloat;

var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');





var textInputType = new GraphQLInputObjectType({
    name: 'textInput',
    fields: function () {
        return {

            textString: {
                type: GraphQLString
            },
            textFontSize:{
                type: GraphQLInt

            },
            posX:{
                type: GraphQLFloat

            },
            posY:{
                type: GraphQLFloat

            },
            textColor:{
                type: GraphQLString

            },


        }
    }
});

var textObject = new GraphQLObjectType({
    name: 'text',
    fields: function () {
        return {

            textString: {
                type: GraphQLString
            },
            textFontSize:{
                type: GraphQLInt
            },
            posX:{
                type: GraphQLFloat

            },
            posY:{
                type: GraphQLFloat

            },
            textColor:{
                type: GraphQLString

            },


        }
    }
});






var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            text: {
                type: new GraphQLList(textObject)
            },
            width: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },

            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },

            images: {
                type: new GraphQLList(GraphQLString)
            },
            lastUpdate: {
                type: GraphQLDate
            },

        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec();
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec();
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    text: {
                        type: new GraphQLList(textInputType)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },

                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },

                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },

                    images: {
                        type: new GraphQLList(GraphQLString)
                    },

                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                     id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLList(textInputType)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },

                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },

                    images: {
                        type: new GraphQLList(GraphQLString)
                    },

                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, { text: params.text, width: params.width, height: params.height, backgroundColor: params.backgroundColor,
                        borderColor: params.borderColor,
                        borderRadius: params.borderRadius, borderWidth: params.borderWidth, margin: params.margin, padding:
                        params.padding, images: params.images ,lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });