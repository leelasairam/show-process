let url='';
let key='';
var supabase  = supabase.createClient(url,key);
let data1;

const GetRow = async() => {
    let queryString = location.search.substring(1);
    if(!queryString){
        window.location.href = "404.html";
    }
    else{
        document.querySelector("#spin").innerHTML = `<br/><div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div><br/><p>Loading...</p>`;
        const {data, error} = await supabase.from('dos').select().eq('id', queryString);
        document.querySelector("#spin").innerHTML='';
        data1=data;
        document.querySelector("#spin").style="margin:none"
        document.querySelector("#title").innerHTML=data[0].title;
        document.querySelector("#description").innerHTML=data[0].description;
        document.querySelector("#created").innerHTML=`${data[0].created_by} , ${data[0].created_at}`;
    }
}

window.onload=GetRow();

const DownLoadPdf = () => {
    const doc = new jsPDF();
    doc.setFont("courier");
    doc.setFontSize(22);
    doc.setTextColor(255,0,0);
    doc.text(`${data1[0].title}`, 10, 10);
    doc.setTextColor(0,0,0);
    doc.setFontSize(10);
    doc.text(`by ${data1[0].created_by}, ${data1[0].created_at}`, 10, 20);
    doc.setFontSize(14);
    doc.text(' ', 10, 30);
    var splitTitle = doc.splitTextToSize(`${data1[0].description}`, 180);
    doc.text(splitTitle, 10, 30);
    doc.save(`process-${new Date().toString().slice(0,24)}.pdf`);
}

const CopyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    document.querySelector("#copybtn").innerHTML=`<i class="bi bi-check-circle">`;
    setTimeout(()=>{
        document.querySelector("#copybtn").innerHTML=`<i class="bi bi-clipboard"></i>`;
    },2000);

}
