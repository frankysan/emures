// Functions
function gcd (a, b) {
    return (b == 0) ? a : gcd (b, a%b);
}

function res_in (str) {
  res_in_w = parseInt(str.substring(0,str.indexOf("x")));
  res_in_h = parseInt(str.substring((str.indexOf("x"))+1));
  gcd_in = gcd(res_in_w, res_in_h);
  in_width.textContent = res_in_w;
  in_height.textContent = res_in_h;
  in_aspect.textContent = res_in_w/gcd_in + "/" + res_in_h/gcd_in;
}

function res_out (str) {
  res_out_w = parseInt(str.substring(0,str.indexOf("x")));
  res_out_h = parseInt(str.substring((str.indexOf("x"))+1));
  gcd_out = gcd(res_out_w, res_out_h);
  out_width.textContent = res_out_w;
  out_height.textContent = res_out_h;
  out_aspect.textContent = res_out_w/gcd_out + "/" + res_out_h/gcd_out;
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
}

update();
