class ProductManager {
    constructor(){
        this.element = [];
    }

    getElement = () => {
        return this.element;
    }

    addProduct = (title, desctriction, price, thumbnail, code, stock) => {

        const product = {
            id : this.element.length === 0 ? 1 : this.element[this.element.length - 1].id + 1,
            title,
            desctriction,
            price,
            thumbnail,
            code,
            stock
        }

        if (product.title !== undefined && product.desctriction !== undefined 
        && product.price !== undefined && product.thumbnail !== undefined 
        && product.code !== undefined && product.stock !== undefined){
            if(this.element.length !== 0){
                let code = this.element.some(x => x.code === product.code);
             
                if(code){
                   return console.log("Codigo existente, verificar codigo para agregar correctamente: ",product) ;
                } else {
                    this.element.push(product);
                    
                }
            }else{
                this.element.push(product);
            }
        }else{
            return console.log("Todo los campos son obligatorios, verificar campos: ",product)
        }
        
       
       
        return product;
    }

    getProductById = (id) => {
        if(this.element.length !== 0){
            let item = this.element.filter( x => x.id === id);
            if(item.length !== 0){
               return console.log("Producto existente: ",item)
            }else{
                return console.log("Not found")
            }
        }else{
            return console.log("No hay productos guardados")
        }
    }
}

const product = new ProductManager();
product.addProduct('Pelota 1', 'Futbol 11 Talleres', 7000, 
'Sin imagen', 'A0001', 10)
product.addProduct('Pelota 2', 'Futbol 11 River', 7000, 
'Sin imagen', 'A0002', 20)
product.addProduct('Pelota 3', 'Futbol 11 River', 7000, 
'Sin imagen', 'A0002', 20)
product.addProduct('Pelota 4', 'Futbol 11 Independiente', 7000, 
'Sin imagen', 'A0004', 30)
product.addProduct('Pelota 4', 'Futbol 11 Independiente', 
'Sin imagen', 'A0004', 30)
product.addProduct('Pelota 4', 'Futbol 11 Independiente', 
'Sin imagen', 'A0004', 30)
console.log('Productos Agregados: ',product.getElement())
product.getProductById(2)
product.getProductById(5)
product.getProductById(1)