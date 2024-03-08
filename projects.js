document.addEventListener('DOMContentLoaded', function () {
    fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const projects = data;
        const projectContainer = document.getElementById('project-container');
        const filterButtonsContainer = document.querySelector('.filter-buttons');
        let categories = new Set();

        // Add the 'All' category
        categories.add('All Categories');

        // Create filter buttons based on skills
        projects.forEach(project => {
            project.skills.forEach(skill => categories.add(skill));
        });

        categories.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('category-btn', 'btn');
            button.textContent = category;
            if(category==='All Categories'){
                button.classList.add('active');
            }
            button.addEventListener('click', function() {
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                if(category === 'All Categories') {
                    loadProjects(projects);
                } else {
                    filterProjects(category);
                }
            });
            filterButtonsContainer.appendChild(button);
        });

        // Initial load of all projects
        loadProjects(projects);

        
        function loadProjects(projects) {
            projectContainer.innerHTML = ''; // Clear the container
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('col-md-4', 'mb-4');
                projectCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${project.projectBgImage}" class="card-img-top" alt="${project.ProjectName}">
                        <div class="card-body">
                            <h5 class="card-title">${project.ProjectName}</h5>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#projectModal${project.projectId}">Learn More</button>
                        </div>
                    </div>
                `;
        
                const projectModal = document.createElement('div');
                projectModal.classList.add('modal', 'fade');
                projectModal.id = `projectModal${project.projectId}`;
                projectModal.setAttribute('tabindex', '-1');
                projectModal.setAttribute('aria-labelledby', `projectModalLabel${project.projectId}`);
                projectModal.setAttribute('aria-hidden', 'true');
                projectModal.innerHTML = `
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="projectModalLabel${project.projectId}">${project.ProjectName}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ${project.projectDesc}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <a href="${project.ProjectLink}" class="btn btn-primary">Code</a>
                            </div>
                        </div>
                    </div>
                `;
        
                // Append both card and modal to the container
                projectContainer.appendChild(projectCard);
                projectContainer.appendChild(projectModal);
            });
        }
        
        

        function filterProjects(category) {
            const filteredProjects = projects.filter(project => project.skills.includes(category));
            loadProjects(filteredProjects);
        }

        // Activate the 'All Categories' button by default
        //document.querySelector('.category-btn').classList.add('active');
    });
});
