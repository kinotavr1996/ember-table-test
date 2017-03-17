export default function () {


  // this.patch('/authors/:id');

  // this.patch('/authors/:id', (db, request) => {
  //   let params = JSON.parse(request.requestBody);
  //   let model = params.data.attributes;
  //   db.model.update(model);
  //   return params;
  // });


  this.put('/authors/:id');
  this.get('/authors/:id', function (db, request) {
    let id = request.params.id;
    let author = db.authors.find(id);

    // load book
    let books = [];
    db.books.where({author_id: id}).forEach(function (item) {
      item.type = 'books';
      books.push(item);
    });

    return {
      data: {
        type: 'authors',
        id: id,
        attributes: author,
        relationships: {
          books: {
            data: books
          }
        }
      }
    };
  });
  this.get('/authors', function (db, request) {
    return {
      data: db.authors.map(attrs => (
      {type: 'authors', id: attrs.id, attributes: attrs}
      ))
    };
  });

  this.put('/books/:id');
  this.get('/books/:id', function (db, request) {
    let id = request.params.id;
    let book = db.books.find(id);

    // load author
    let author = db.authors.where({id: book.author_id});
    author = author[0];
    // plug in the type
    author.type = 'author';

    return {
      data: {
        type: 'books',
        id: id,
        attributes: book,
        relationships: {
          author: {
            data: author
          }
        }
      }
    };
  });

  this.get('/books', function (db, request) {
    return {
      data: db.books.map(attrs => (
      {type: 'books', id: attrs.id, attributes: attrs}
      ))
    };
  });

  // These comments are here to help you get started. Feel free to delete them.

  /*
   Config (with defaults).

   Note: these only affect routes defined *after* them!
   */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
   Route shorthand cheatsheet
   */
  /*
   GET shorthands

   // Collections
   this.get('/contacts');
   this.get('/contacts', 'users');
   this.get('/contacts', ['contacts', 'addresses']);

   // Single objects
   this.get('/contacts/:id');
   this.get('/contacts/:id', 'user');
   this.get('/contacts/:id', ['contact', 'addresses']);
   */

  /*
   POST shorthands

   this.post('/contacts');
   this.post('/contacts', 'user'); // specify the type of resource to be created
   */

  /*
   PUT shorthands

   this.put('/contacts/:id');
   this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
   */

  /*
   DELETE shorthands

   this.del('/contacts/:id');
   this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

   // Single object + related resources. Make sure parent resource is first.
   this.del('/contacts/:id', ['contact', 'addresses']);
   */

  /*
   Function fallback. Manipulate data in the db via

   - db.{collection}
   - db.{collection}.find(id)
   - db.{collection}.where(query)
   - db.{collection}.update(target, attrs)
   - db.{collection}.remove(target)

   // Example: return a single object with related models
   this.get('/contacts/:id', function(db, request) {
   var contactId = +request.params.id;

   return {
   contact: db.contacts.find(contactId),
   addresses: db.addresses.where({contact_id: contactId})
   };
   });

   */
}

/*
 You can optionally export a config that is only loaded during tests
 export function testConfig() {

 }
 */
