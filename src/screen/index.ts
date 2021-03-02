const view: HTMLElement | null = document.getElementById("screen");

const ChangeView: Function = function (to_append: string | HTMLElement, callback?: null | Function) {
    if (view) {
        console.log(typeof to_append)
        if (typeof to_append == 'string') {
            view.innerHTML = to_append
        } else view.appendChild(to_append)
    }
    if (callback) callback()
}

const screens = class {

    public static hello_world: string = `
    <div>
        hello_world
    </div>
    <div style="color: red;">
        Hi!!
    </div>
    `

    public static test: string = `
        <div>
            test
        </div>
    `
}

ChangeView(screens.hello_world, async () => {
    setTimeout(()=>{
        ChangeView(screens.test)
    }, 5000)
})
