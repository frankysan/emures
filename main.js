// Functions
function gcd (a, b) {
    return (b == 0) ? a : gcd (b, a%b);
}

function res_in (str) {
  res_in_w = parseInt(str.substring(0,str.indexOf("x")));
  res_in_h = parseInt(str.substring(str.indexOf("x")+1,str.indexOf("-")));
  gcd_in = gcd(res_in_w, res_in_h);
  in_width.textContent = res_in_w;
  in_height.textContent = res_in_h;
  in_aspect_w = res_in_w/gcd_in;
  in_aspect_h = res_in_h/gcd_in;
  in_aspect.textContent = in_aspect_w + "/" + in_aspect_h;
}

function res_out (str) {
  res_out_w = parseInt(str.substring(0,str.indexOf("x")));
  res_out_h = parseInt(str.substring(str.indexOf("x")+1));
  gcd_out = gcd(res_out_w, res_out_h);
  out_width.textContent = res_out_w;
  out_height.textContent = res_out_h;
  out_aspect_w = res_out_w/gcd_out;
  out_aspect_h = res_out_h/gcd_out;
  out_aspect.textContent = out_aspect_w + "/" + out_aspect_h;
}

function update() {
  select_res_in = document.getElementById('res_in');
  option_res_in = select_res_in.options[select_res_in.selectedIndex];
  res_in(option_res_in.value);

  select_res_out = document.getElementById('res_out');
  option_res_out = select_res_out.options[select_res_out.selectedIndex];
  res_out(option_res_out.value);

  int_multi_nocutoff = Math.min(Math.floor(res_out_w/res_in_w),Math.floor(res_out_h/res_in_h));
  int_multi.textContent = int_multi_nocutoff;

  int_multi_withcutoff = int_multi_nocutoff+1;
  int_multi_cut.textContent = int_multi_withcutoff;

  vspace_unused_percent = Math.round((res_out_w - res_in_w * int_multi_nocutoff) / res_out_w * 100);
  vspace_unused.textContent = vspace_unused_percent + "%";

  hspace_unused_percent = Math.round((res_out_h - res_in_h * int_multi_nocutoff) / res_out_h * 100);
  hspace_unused.textContent = hspace_unused_percent + "%";

  v_cutoff_pixels = Math.round(Math.max(res_in_w - (res_out_w / int_multi_withcutoff),0));
  v_cutoff.textContent = v_cutoff_pixels + " / " + res_in_w;

  h_cutoff_pixels =  Math.round(Math.max(res_in_h - (res_out_h / int_multi_withcutoff),0));
  h_cutoff.textContent = h_cutoff_pixels + " / " + res_in_h;

  img_url = "./img/" + option_res_in.value + ".png";
  document.getElementById("image_original").src = img_url;

// Set size of image container and adjust for output aspect ratio
  container_w = 180/out_aspect_h*out_aspect_w;
  container_h = 180;
  img_coll = document.getElementsByClassName("img");
  for(var i=0, len=img_coll.length; i<len; i++)
  {
      img_coll[i].style.width = container_w + "px";
      img_coll[i].style.height = container_h + "px";
  }

  // Set size of integer scaled image container
  container_int_w =  res_in_w * int_multi_nocutoff / res_out_w * container_w;
  container_int_h =  res_in_h * int_multi_nocutoff / res_out_h * container_h;
  document.getElementById("image_integer_div").style.width = container_int_w + "px";
  document.getElementById("image_integer_div").style.height = container_int_h + "px";

  // Set size of cutoff image container
  container_cut_w = (res_in_w - v_cutoff_pixels ) * int_multi_withcutoff / res_out_w * container_w;
  container_cut_h = (res_in_h - h_cutoff_pixels ) * int_multi_withcutoff / res_out_h * container_h;
  document.getElementById("image_cutoff_div").style.width = container_cut_w + "px";
  document.getElementById("image_cutoff_div").style.height = container_cut_h + "px";
//  document.getElementById("image_cutoff").style.clipPath = "inset("+ Math.floor(h_cutoff_pixels/2) +"px "+ Math.floor(v_cutoff_pixels/2) +"px "+ h_cutoff_pixels-Math.floor(h_cutoff_pixels/2) +"px "+ v_cutoff_pixels-Math.floor(v_cutoff_pixels/2) +"px)";
//  document.getElementById("image_cutoff").style.clipPath = "inset(10px 10px 10px 10px)";

// Set size of integer image
image_int_w = res_in_w * int_multi_nocutoff / res_out_w * container_w;
image_int_h = res_in_h * int_multi_nocutoff / res_out_h * container_h;
document.getElementById("image_integer").width = image_int_w;
document.getElementById("image_integer").height = image_int_h;

// Set size of cutoff image
image_cut_w = res_in_w * int_multi_withcutoff / res_out_w * container_w;
image_cut_h = res_in_h * int_multi_withcutoff / res_out_h * container_h;
document.getElementById("image_cutoff").width = image_cut_w;
document.getElementById("image_cutoff").height = image_cut_h;

document.getElementById("image_integer").src = img_url;
document.getElementById("image_cutoff").src = img_url;


}

update();
