import React from "react";

export const Hero02 = ({color, darkMode, title, content}) => {

    return (
        <section className={`${darkMode? 'text-gray-500 bg-gray-900' : 'text-gray-700'} body-font`}>
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
                <div className="text-center lg:w-2/3 w-full">
                    <h1 className={`title-font sm:text-4xl text-3xl mb-4 font-medium ${darkMode? 'text-white':'text-gray-900'}`}>
                        {title}
                    </h1>
                    <p className="leading-relaxed mb-8">
                        {content}
                    </p>
                    <div className="flex justify-center">
                        <button className={`inline-flex text-white bg-${color}-500 border-0 py-2 px-6 focus:outline-none hover:bg-${color}-600 rounded text-lg`}>
                            Button
                        </button>
                        <button className={`ml-4 inline-flex ${darkMode? 'text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-white' : 'text-gray-700 bg-gray-200 hover:bg-gray-300'} border-0 py-2 px-6 focus:outline-none rounded text-lg`}>
                            Button
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const Hero02Block = {
    Component: Hero02,
    template: {
        name: 'hero02',
        label: 'Hero02',
        screenshot: 'https://res.cloudinary.com/dku5a4oh9/image/upload/v1605247072/pageya/demo/hero02.png',
        tags: 'hero, one-column, image',
        defaultItem: {
            color: 'blue',
            darkMode: true,
            title: 'The standard Lorem Ipsum passage, used since the 1500s',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        fields: [
            {name: 'title', label: 'Title', component: 'text'},
            {name: 'content', label: 'Content', component: 'longtext'},
            {
                name: 'color', label: 'Color', component: 'choice',
                choices: ["indigo", "orange", "teal", "red", "purple", "pink", "blue", "green"],
            },
            {name: 'darkMode', label: 'DarkMode', component: 'boolean'},
        ]
    }
}