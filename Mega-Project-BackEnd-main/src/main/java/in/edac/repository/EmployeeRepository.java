package in.edac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import in.edac.model.Employee;
import java.util.List;

@Repository
	public interface EmployeeRepository extends JpaRepository<Employee,Long>{

	 @Query(value="select * from employee where team_lead_id = :id" ,nativeQuery=true )
     List<Employee> findAllBy(@Param("id") long id); 
	}


