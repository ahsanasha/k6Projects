import http from 'k6/http'


/*Code for configure the virtual users*/
export let options = {
    vus: 10,
    duration: '10s'

}
/*Main Function*/
export default function () {
       const url = 'https://fakestoreapi.com/products';
        const params = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const data = JSON.stringify({
          title:'Gloves'+Math.floor(Math.random()*100000),
          price:'12.51'*Math.floor(Math.random()*10),
          description:'Ini adalah deskripsi '+Math.floor(Math.random()*100000),
          image:'https://i.pravatar.cc',
          category: 'Ini adalah kategori '+Math.floor(Math.random()*100000),
        });

        const res = http.post(url,data,params);
}
