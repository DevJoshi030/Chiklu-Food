function hello(name, id, element) {
    // console.log("Thai gayu");
    // console.log(name , price);
    // var y = document.getElementById('name').innerText;
    // console.log(y);
    if (localStorage.getItem("checkout") == null) {
      var checkout = [];
      var data = [`${name}`, `${id}`];
      checkout.push(data);
      localStorage.setItem("checkout", JSON.stringify(checkout));
      console.log(checkout);

      // localStorage.setItem('checkout', 'hii');
    } else {
      checkout = JSON.parse(localStorage.getItem("checkout"));
      // console.log(checkout);
      var data = [`${name}`, `${id}`];
      // console.log(data);
      checkout.push(data);
      localStorage.setItem("checkout", JSON.stringify(checkout));

      // console.log(`This is Final`, checkout);
    }
    console.log(checkout);

    // var h = id ;
    // console.log(id);
    // console.log(h);
    // document.getElementsByClassName('addtodish')[element].innerText = "Done";
    // console.log(element);
    // document.getElementById(element).innerHTML = "<p>Hoooo</p>";
    // localStorage.setItem(element, "hoo");
    // btnchange(element);
    updateChekout(checkout);

    // var idstr = this.id.toString();
    // console.log(idstr);
  }

  function updateChekout(checkout) {
    // var sum = 0;
    for (var item in checkout) {
        // sum = sum + checkout[item][0];
        console.log('hii',checkout[item][1]);
        if (checkout[item][1] !== 0)
        // console.log(document.getElementById('divpr1').innerText)
        console.log(item)
            document.getElementById('divpr1').innerHTML = `<button id='minus${item}' class='btn btn-primary minus'>-</button><span id='val${item}'>${checkout[item][1]}</span><button id='plus${item}' class='btn btn-primary plus'>+</button>`
    }
    localStorage.setItem('checkout', JSON.stringify(checkout));
    // document.getElementById('checkout').innerHTML = sum;
  };

  

  // function btnchange(element) {
  //   // console.log(element);
  //   var f = "ADD TO DISH";
  //   // document.getElementById('pr1').innerText = 'hello';
  //   var check = localStorage.getItem(element)
  //   console.log(document.getElementById(element));
  //   console.log(check)
  //   if (check  != null) {
  //     f = check;
  //   } 
  //   document.getElementById(element).innerText = f;
  // }

  // const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

  // let myRef = useRef(null)
  // var owlcategory = [];

  // const executeScroll = () => scrollToRef(myRef)
  const executeScroll = () => {
    // console.log("Clicked");
    // let xyz = document.getElementsByClassName('catname').innerHTML;
    // var x = document.getElementsByClassName("catname")[0].innerText;
    // document.getElementsByClassName("demo").innerHTML = x;
    // console.log(x);
    scrollToRef(myRef);
    // console.log(myRef);
  };