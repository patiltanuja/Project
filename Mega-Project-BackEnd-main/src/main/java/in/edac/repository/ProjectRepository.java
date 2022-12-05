package in.edac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import in.edac.model.Employee;
import in.edac.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
	//public Project addProject(Project project);

	Project findByProjectName(String projectname);
	
	@Query(value="select * from project where team_lead_id = :id" ,nativeQuery=true )
    List<Project> findAllBy(@Param("id") long id); 
	
}
