const addMember = person => {
    let { image_src, name, matric_no, program, ...rest } = person;

    let person_div = document.createElement("div");
    person_div.classList.add("profile-card");

    let img_tag = document.createElement("img");
    img_tag.src = image_src;
    img_tag.alt = "Picture of " + name;
    img_tag.classList.add("profile-pic");
    person_div.appendChild(img_tag);

    let blurb = document.createElement("div");
    blurb.classList.add("blurb");

    let name_div = document.createElement("h4");
    name_div.innerText = name;
    name_div.classList.add("person-name");
    blurb.appendChild(name_div);

    let matric_no_div = document.createElement("div");
    matric_no_div.innerText = matric_no;
    name_div.classList.add("matric-no");
    blurb.appendChild(matric_no_div);

    let program_div = document.createElement("div");
    program_div.innerText = program;
    program_div.classList.add("person-program");
    blurb.appendChild(program_div);

    person_div.appendChild(blurb);

    const grid = document.querySelector(".people-grid");
    grid.appendChild(person_div)
}

const MEMBERS = [
    {
        image_src: "assets/Daniel_pfp.jpg",
        name: "Daniel Chinedu Onyesoh",
        matric_no: "20CG028130",
        program: "Computer Science",
    },
    {
        image_src: "",
        name: "Enyi-Abonta Bliss",
        matric_no: "20CG028079",
        program: "Computer Science",
    },
    {
        image_src: "",
        name: "Oludele Joyce",
        matric_no: "20CG028123",
        program: "Computer Science",
    },
    {
        image_src: "",
        name: "Adegbite Oluwasayemidero",
        matric_no: "20CG028032",
        program: "Computer Science",
    },
    {
        image_src: "",
        name: "Daudu John",
        matric_no: "20CG028063",
        program: "Computer Science",
    },
    {
        image_src: "",
        name: "Soji-Odus Korede",
        matric_no: "20CH028189",
        program: "MIS",
    },
    {
        image_src: "",
        name: "Ebunlomo Daniel",
        matric_no: "20CH028162",
        program: "MIS",
    },
]

MEMBERS.map(addMember)

const form = document.querySelector("form");

const submit_btn = document.getElementById("submit_btn");

submit_btn.addEventListener("click", e => {
    e.preventDefault();
    let form_entries = new FormData(form).entries();

    let raw_user_data = Array.from(form_entries).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    raw_user_data["image_src"] = URL.createObjectURL(raw_user_data["pfp"])

    addMember(raw_user_data)

    console.log(raw_user_data)
}
);