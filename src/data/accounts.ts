export interface Account {
  username: string;
  password: string;
  displayName: string;
  role: "student" | "presenter";
}

export const accounts: Account[] = [
  // ===== BOYS =====
  { username: "justin",       password: "candy01", displayName: "Justin Yuri B. Litiatco",        role: "student" },
  { username: "johncloyd",    password: "candy02", displayName: "John Cloyd E. Marcos",           role: "student" },
  { username: "yeshua",       password: "candy03", displayName: "Yeshua Ezekiel E. Day-yo",       role: "student" },
  { username: "markedward",   password: "candy04", displayName: "Mark Edward P. Españar",         role: "student" },
  { username: "adam",         password: "candy05", displayName: "Adam Leonard S. Sarayno",         role: "student" },
  { username: "janzhen",      password: "candy06", displayName: "Janzhen Cyan M. Janaban",         role: "student" },
  { username: "karl",         password: "candy07", displayName: "Karl Patrick A. Giray",           role: "student" },
  { username: "radecus",      password: "candy08", displayName: "Radecus E. Molina",               role: "student" },
  { username: "jameskiel",    password: "candy09", displayName: "James Kiel Vergara Martinez",     role: "presenter" },
  { username: "rafael",       password: "candy10", displayName: "Rafael G. Sumabat",               role: "student" },
  { username: "andrei",       password: "candy11", displayName: "Andrei Lance Mediano",             role: "student" },
  { username: "daryn",        password: "candy12", displayName: "Daryn Joseph N. Reodica",         role: "student" },
  { username: "arsher",       password: "candy13", displayName: "Arsher Lab D. Ditan",             role: "presenter" },
  { username: "killua",       password: "candy14", displayName: "Killua King Eran",                 role: "student" },
  { username: "llance",       password: "candy15", displayName: "Llance Jhosua I. Joven",          role: "student" },
  { username: "lenard",       password: "candy16", displayName: "Lenard M. Pongpong",               role: "student" },
  { username: "daniel",       password: "candy17", displayName: "Daniel Alexander D. Pasay",       role: "student" },
  { username: "carl",         password: "candy18", displayName: "Carl Allen R. Acedillo",           role: "student" },
  { username: "david",        password: "candy19", displayName: "David S. Gabasa",                  role: "student" },
  { username: "johncaleb",    password: "candy20", displayName: "John Caleb C. Espiritu",           role: "student" },
  { username: "bensim",       password: "candy21", displayName: "Bensim Marc G. Ramos",             role: "student" },
  { username: "janeiro",      password: "candy22", displayName: "Janeiro Lebron I. Manlulu",        role: "student" },
  { username: "nathan",       password: "candy23", displayName: "Nathan Brylee S. Natividad",       role: "student" },
  { username: "keira",        password: "candy24", displayName: "Keira Andrese R. Alejandro",       role: "student" },
  { username: "alexander",    password: "candy25", displayName: "Alexander Jazz M. Arteza",         role: "student" },
  { username: "keifer",       password: "candy26", displayName: "Keifer Jade P. Jose",              role: "student" },
  { username: "asher",        password: "candy27", displayName: "Asher Lab Ditan",                   role: "student" },
  { username: "johnbenm",     password: "candy28", displayName: "John Benedict D. Malonzo",         role: "student" },
  { username: "johnbens",     password: "candy29", displayName: "John Benedict S. Maligaya",        role: "student" },
  { username: "jamesmichael", password: "candy30", displayName: "James Michael D. Golez",           role: "student" },
  // ===== GIRLS =====
  { username: "krizzel",      password: "candy31", displayName: "Krizzel Shane M. Lopez",           role: "student" },
  { username: "kirsten",      password: "candy32", displayName: "Kirsten Alexa D. Brigola",         role: "student" },
  { username: "chloe",        password: "candy33", displayName: "Chloe Rionna E. Gutierrez",        role: "student" },
  { username: "princess",     password: "candy34", displayName: "Princess Rainne M. Rondon",        role: "student" },
  { username: "annesarah",    password: "candy35", displayName: "Anne Sarah N. Solomon",             role: "student" },
  { username: "mitzi",        password: "candy36", displayName: "Mitzi Claire P. Ortega",            role: "student" },
  { username: "jireh",        password: "candy37", displayName: "Jireh Gleone L. Cahilig",           role: "student" },
  { username: "stephanie",    password: "candy38", displayName: "Stephanie G. Laurente",              role: "student" },
  { username: "danelle",      password: "candy39", displayName: "Danelle Kate A. Yap",               role: "student" },
  { username: "sebrina",      password: "candy40", displayName: "Sebrina L. Thomas",                  role: "student" },
];

export function authenticate(username: string, password: string): Account | null {
  return accounts.find(
    (a) => a.username.toLowerCase() === username.toLowerCase() && a.password === password
  ) || null;
}

export function getStudentAccounts(): Account[] {
  return accounts.filter((a) => a.role === "student");
}
