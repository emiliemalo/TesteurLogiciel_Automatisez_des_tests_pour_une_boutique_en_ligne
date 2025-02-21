describe('Products API', () => {
    // Définition du schéma attendu pour un produit
    const productSchema = {
      id: 'number',
      name: 'string',
      availableStock: 'number',
      skin: 'string',
      aromas: 'string',
      ingredients: 'string',
      description: 'string',
      price: 'number',
      picture: 'string',
      varieties: 'number'
    };
  
    beforeEach(() => {
      cy.request('GET', 'http://localhost:8081/products').as('productsRequest'); // Utilisation de baseUrl
    });
  
    it('should return a valid response with correct product schema', () => {
      cy.get('@productsRequest').then((response) => {
        // Vérifie que la requête a réussi
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('application/json');
        expect(response.body).to.be.an('array');
  
        // Vérifie que chaque produit respecte le schéma défini
        response.body.forEach(product => {
          Object.entries(productSchema).forEach(([key, type]) => {
            expect(product).to.have.property(key);
            expect(product[key]).to.be.a(type);
          });
        });
      });
    });
  });
  