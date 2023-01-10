//Authentication
let url='';
let key='';
var supabase  = supabase.createClient(url,key);

const SignUp = async() => {
    //event.preventDefault()
    const email = document.querySelector("#auth-email").value;
    const password = document.querySelector("#auth-password").value;
    //alert(email + password)
  
    await supabase.auth
      .signUp({ email, password })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        alert(err)
      })
  }
  
  const LogIn = async() => {
    const email = document.querySelector("#auth1-email").value;
    const password = document.querySelector("#auth1-password").value;
  
    await supabase.auth
      .signInWithPassword({ email, password })
      .then(async(response) => {
        console.log("logged in as : " + response.data.user.email);
        const { data: { user } } = await supabase.auth.getUser();
        sessionStorage.setItem("todouser", JSON.stringify([user.id,user.email]));
        window.location.href = `app.html`;
      })
      .catch((error) => {
        alert("Please enter valid credentials")
      })
  }

  function LoginBtn(){
    document.querySelector("#loginbtn").style="display:block;display:grid;place-items:center;padding:1rem"
    document.querySelector("#signupbtn").style="display:none;"
  }
  function SignupBtn(){
    document.querySelector("#loginbtn").style="display:none;"
    document.querySelector("#signupbtn").style="display:block;display:grid;place-items:center;padding:1rem"
  }
  
  
  /*function setToken(response) {
    console.log(response);
    if (response.user.confirmation_sent_at && !response?.session?.access_token) {
      alert('Confirmation Email Sent')
    }else {
      document.querySelector('#access-token').value = response.session.access_token
      document.querySelector('#refresh-token').value = response.session.refresh_token
      alert('Logged in as ' + response.user.email)
    }
  }
  
  const fetchUserDetails = async() => {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user.email);
  }
  
  
  const Logout = async() => {
  
    await supabase.auth
      .signOut()
      .then((_response) => {
        alert('Logout successful');
        
      })
      .catch((err) => {
        alert(err.response.text)
      })
  }*/
  
  
  
  
