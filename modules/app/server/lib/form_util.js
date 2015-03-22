Form = Form || {};
Form.validateSchemaOnDoc = function (schema, doc) {
  var valContext = schema.newContext();
  var valid = valContext.validate(doc);
  if (!valid) {
    console.log(valContext.invalidKeys());
    throw new Meteor.Error('form-invalid', 'The context validate fails!', JSON.stringify(valContext.invalidKeys()));
  }
  check(doc, schema);
};


Form.removeEmptyObjects = function (doc) {
  _.each(doc, function (val, key) {
    if (_.isObject(val) && _.isEmpty(val)) {
      delete doc[key];
    } else if (_.isArray(val)) {
      doc[key] = _.without(val, _.find(val, _.isEmpty));
    } else if (_.isObject(val)) {
      Form.removeEmptyObjects(val)
    }
  })
};

Form.getModifFromDoc = function (docToModify) {
  var flattenDoc = flatten(docToModify);
  var modif = {};
  var unsetProperty = function (prop) {
    modif.$unset = modif.$unset || {};
    modif['$unset'][prop] = '';
    delete flattenDoc[prop];
  };

  _.each(flattenDoc, function (val, key) {
      if (_.isArray(val) && _.isEmpty(val)) {
        unsetProperty(key);
      } else if (val === '') {
        unsetProperty(key);
      } else if (val === null) {
        unsetProperty(key);
      }
    }
  );

  modif.$set = flattenDoc;
  return modif;
};

Form.cleanAndValidateSchemaOnDoc = function (schema, doc, isUpdate) {
  var autoValueContext = {isInsert: true, isUpdate: false, isUpsert: false};
  if (isUpdate) {
    autoValueContext = {isUpdate: true, isInsert: false, isUpsert: false};
  }
  schema.clean(doc, {
    extendAutoValueContext: autoValueContext
  });

  Form.removeEmptyObjects(doc);

  Form.validateSchemaOnDoc(schema, doc);

};