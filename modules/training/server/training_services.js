Services = {};
Services.Training = {
  insertTraining: function (doc) {
    var schema = Schemas.Training;
    console.log("INSERT", doc);
    Form.cleanAndValidateSchemaOnDoc(schema, doc);

    var id = Training.insert(doc);
    return id;
  },

  updateTraining: function (docId, doc) {

    var schema = Schemas.Training;
    Form.cleanAndValidateSchemaOnDoc(schema, doc, true);

    var modif = Form.getModifFromDoc(doc);

    var update = Training.update(docId, modif);

    return update;
  }
};
