# Project Creation
npx -p @angular/cli@latest ng new angular-material-dashboard  -s -t -S

# Add Material & CDK

https://material.angular.dev/guide/getting-started

ng add @angular/material

# Add Tailwind 4

https://tailwindcss.com/docs/installation/framework-guides/angular

npm install tailwindcss @tailwindcss/postcss postcss --force

# Routes
1.
ng g c pages/dashboard --export-default

2. app.routes.ts

```ts
export const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard')},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
```

# JSON SERVER

1.
npm i json-server -D

2. Create db.json

```json
{
  "cities": [
    {
      "id": "1001",
      "name": "Milan",
      "position": 0
    },
    {
      "id": "2",
      "name": "Rome",
      "position": 1
    },
    {
      "id": "3",
      "name": "New York",
      "position": 2
    }
  ]
}
```
3. npm run server


