declare module 'vscode-cache' {
    import * as vscode from 'vscode'

    class Cache {
        constructor (context:vscode.ExtensionContext, namespace?:string)
        
        put (key: string, value: any, expiration?: number) : Promise<void> | Promise<boolean>
        set (key: string, value: any, expiration?: number) : Promise<void> | Promise<boolean>
        save (key: string, value: any, expiration?: number) : Promise<void> | Promise<boolean>
        store (key: string, value: any, expiration?: number) : Promise<void> | Promise<boolean>
        cache (key: string, value: any, expiration?: number) : Promise<void> | Promise<boolean>


        get (key: string, defaultValue?: any) : any
        fetch (key: string, defaultValue?: any) : any
        retrieve (key: string, defaultValue?: any) : any

        has (key: string) : boolean
        exists (key: string) : boolean

        forget (key: string) : Promise<void>
        remove (key: string) : Promise<void>
        delete (key: string) : Promise<void>


        keys () : string[]


        all () : object
        getAll () : object

        flush () : Promise<void>
        clearAll () :  Promise<void>

        getExpiration (key:string) : number

        isExpired (key: string) : boolean

    }

    export = Cache;
}

