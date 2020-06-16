    var img1 = "https://images.lojanike.com.br/1024x1024/produto/181042_1723965_20191008180520.png";
    var img2 = "https://images.lojanike.com.br/1024x1024/produto/186637_1673133_20190909164242.png";
    var img3 = "https://images.lojanike.com.br/500x500/produto/180963_1723479_20191008180520.png";
    var img4 = "https://images.lojanike.com.br/500x500/produto/178948_1572374_20190801175454.png";
    var img5 = "https://images.lojanike.com.br/500x500/produto/181667_1668341_20190909160838.png";
    var img6 = "https://images.lojanike.com.br/1024x1024/produto/100185_707942_20190701165003.png";


    var valorTotal = 0.0;

    var lista = [
            { "img": img1, "info": "Tênis Nike Air Max 90 Essential", "valor": 499.99, "qtd": 1, "valorTotal":499.99, "status":1},
            { "img": img2, "info": "Tênis Nike Air Force 1 '07", "valor": 399.99, "qtd": 1, "valorTotal":399.99, "status":1},
            { "img": img3, "info": "Tênis Nike Air Max 270", "valor": 599.99, "qtd": 1, "valorTotal": 599.99, "status":1},
            { "img": img4, "info": "Tênis Nike Air Max 270 React (Optical)", "valor": 499.99, "qtd": 1, "valorTotal": 499.99, "status":1},
            { "img": img5, "info": "Tênis Nike Air VaporMax 2019", "valor": 899.99, "qtd": 1, "valorTotal": 899.99, "status":1},
            { "img": img6, "info": "Tênis Nike Air Max Plus", "valor": 439.99, "qtd": 1, "valorTotal": 439.99, "status":1}
        ]
    var carrinho = []

    lista.forEach(coisas => {
        $('#listaProdutos').append('<li><div id="imgcard"><img src="' + coisas.img + '"></div> <p class="info">' + coisas.info + '</p><p class="valor">R$' + coisas.valor + '</p><button class="btn" value="comprar">adicionar</button></li>')
        chamarBotao()
    });

    function listar(){
        $("#listaCarrinho li").remove()
        carrinho.forEach(produto => {
            $('#listaCarrinho').append('<li><img src="' + produto.img + '"><p class="info">' + produto.info + '</p><div class="valor"><p class="qnt">'+ produto.qtd +'</p><p class="valorAtual">x R$' + produto.valor + '</p></div><div><button class="btn" value="subtrair">-1</button><button class="btn" value="excluir">excluir</button><button class="btn" value="adicionar">+1</button></div></li>')
        })
        $('#qtdCarrinho').text(carrinho.length)

        chamarBotao()
    }

    $("button[value=comprar]").on("click", function() {
        var index = $(this).closest('li').index()
        
        if(lista[index].status==1){
            carrinho.unshift(lista[index])
            notificar(index)
        }else{
            notificar(index)
        }

        lista[index].status++
                
        listar()       
        calcTotal()
    })

    function chamarBotao(){

        $("button[value=excluir]").on("click", function() {        
            var index = $(this).closest('li').index()

            lista.forEach(produto =>{
                if(carrinho[index].img == produto.img){
                    produto.status = 1
                    produto.qtd = 1
                    produto.valorTotal = produto.valor
                }
            })

            carrinho[index].qtd = 1
            carrinho.splice(index,1)
            listar()  
            chamarBotao() 
            calcTotal()

        })

        $("button[value=finalizar]").on("click", function(){
            if(valorTotal>0){
                $("#listaCarrinho").hide()
                $(".finalizado").fadeIn()
                $(".finalizado").css("display","flex")   
            }    
        })

       $("button[value=adicionar]").on("click", function(){
            var index = $(this).closest('li').index()

            carrinho[index].qtd++
            carrinho[index].valorTotal = carrinho[index].valor * carrinho[index].qtd

            calcTotal()
            listar()
       })
        
        $("button[value=subtrair]").on("click", function(){
            var index = $(this).closest('li').index()
                
                if(carrinho[index].qtd==1) {
                    carrinho.splice(index,1)
                    console.log('ola')
                }else{
                    
                    carrinho[index].qtd--
                    carrinho[index].valorTotal = carrinho[index].valor * carrinho[index].qtd

                }

                calcTotal()
                listar()
       })
      
    }
    
    $(".iconCarrinho1").children().on("click", function(){ 
        let i = 0   
        $("#produtos").fadeOut() 
        $("#carrinho").fadeIn()       
        calcTotal()

        if(i==0){
            chamarBotao()
        }

        i++
        console.log(i)
    })

    $("#iconHome").on("click", function(){
        $("#carrinho").fadeOut()   
        $("#produtos").fadeIn() 
    })

    function calcTotal(){
        valorTotal = 0.0;
        carrinho.forEach(produto => {
            valorTotal += produto.valorTotal
        })
        $(".total").text('Total: R$'+valorTotal.toFixed(2))
    }

    function notificar(index){

        if(lista[index].status==1){
            $(".itemAdicionado p").text('Adicionado ao carrinho:')
            $(".ntInfo").text(lista[index].info)
            $(".ntValor").text(lista[index].valor)
        }else{
            $(".itemAdicionado p").text('Produto já foi adicionado')
            $(".ntInfo").text("")
            $(".ntValor").text("")
        }
        $(".itemAdicionado").css("right","-2px")
        setTimeout(function(){
            $(".itemAdicionado").css("right","-350px")
        }, 2000);   
    }
    $(".itemAdicionado").on("click", function(){
        $("#produtos").fadeOut() 
        $("#carrinho").fadeIn()    
        chamarBotao()
    })

    var alturaImg = $('#img1').height();
    $(window).on('scroll', function() { 
          if($(window).scrollTop() >= alturaImg) {
              $('#menu').addClass('fixed-menu');
          }
          else {
              $('#menu').removeClass('fixed-menu');
          }
     });

 
