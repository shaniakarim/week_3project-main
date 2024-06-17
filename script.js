document.addEventListener('DOMContentLoaded', async () => {
    const populationUrl = 'https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff';
    const employmentUrl = 'https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065';

    try {
        const [populationResponse, employmentResponse] = await Promise.all([
            fetch(populationUrl),
            fetch(employmentUrl)
        ]);

        const populationData = await populationResponse.json();
        const employmentData = await employmentResponse.json();

        const municipalities = populationData.dataset.dimension.Alue.category.label;
        const populations = populationData.dataset.value;
        const employmentAmounts = employmentData.dataset.value;

        const tbody = document.querySelector('tbody');

        Object.keys(municipalities).forEach((key, index) => {
            const municipality = municipalities[key];
            const population = populations[index];
            const employmentAmount = employmentAmounts[index];
            const employmentPercentage = ((employmentAmount / population) * 100).toFixed(2);

            const row = document.createElement('tr');
            if (employmentPercentage > 45) {
                row.classList.add('over-45');
            } else if (employmentPercentage < 25) {
                row.classList.add('under-25');
            }

            row.innerHTML = `
                <td>${municipality}</td>
                <td>${population}</td>
                <td>${employmentAmount}</td>
                <td>${employmentPercentage}%</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
