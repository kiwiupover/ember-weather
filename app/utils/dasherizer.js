export default function dasherizer(string){
  return string.split(', ').join('-').split(' ').join('_').toLowerCase();
}
