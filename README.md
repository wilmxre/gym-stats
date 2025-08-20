# Gym Stats

A comprehensive gym workout analytics dashboard with activity calendar and workout insights.

## Features

- **Activity Calendar**: GitHub-style heatmap showing your gym check-in history
- **Workout Analytics**: Charts showing weekly patterns, time preferences, location preferences, and monthly volume
- **Real-time Data**: Live integration with gym check-in data
- **Responsive Design**: Beautiful interface that works on all devices
- **Dark Theme**: Modern dark theme optimized for readability

## What is inside?

This project uses many tools like:

- [Vite](https://vitejs.dev)
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Chart.js](https://www.chartjs.org) - For workout analytics charts
- [Date-fns](https://date-fns.org) - For date manipulation
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)

## Getting Started

### Install

Clone the project.

```bash
git clone https://github.com/your-username/gym-stats.git
```

Access the project directory.

```bash
cd gym-stats
```

Install dependencies.

```bash
npm install
```

Serve with hot reload at <http://localhost:5173>.

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Typecheck

```bash
npm run typecheck
```

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

## Deployment

### GitHub Pages

This project is configured for easy deployment to GitHub Pages.

#### Automatic Deployment

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main/master branch.

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings > Pages
   - Select "GitHub Actions" as the source

2. **Push your code** to the main/master branch:
   ```bash
   git push origin main
   ```

3. **Your site will be available** at: `https://your-username.github.io/gym-stats/`

#### Manual Deployment

You can also deploy manually using the included script:

```bash
npm run deploy
```

**Note**: Make sure you have the `gh-pages` package installed and your repository is set up with the correct remote origin.

### Configuration

The project is pre-configured with:
- **Base URL**: `/gym-stats/` (for GitHub Pages)
- **Build Output**: `dist/` directory
- **GitHub Actions**: Automated workflow for deployment

## License

This project is licensed under the MIT License.
