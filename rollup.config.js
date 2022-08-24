import pkg from './package.json'

function createEntry(options) {
    const config = {
        input: './main.ts'
    }
}

export default [
    createEntry({ format: 'iife', file: pkg.json })
]