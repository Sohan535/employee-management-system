package com.example.demo.service;
import org.apache.poi.ss.usermodel.*;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.util.List;

import com.example.demo.model.Employee;

@Service
public class ExcelExportService{
	
	public ByteArrayInputStream employeesToExcel(List<Employee> employees)throws IOException{
		String[] COLUMNs = {"ID", "First Name", "Last Name", "Email ID"};
		try(Workbook workbook= new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()){
			Sheet sheet = workbook.createSheet("Employee");
			
			 // Header
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
            }
            
            int rowIdx = 1;
            for (Employee emp : employees) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(emp.getId());
                row.createCell(1).setCellValue(emp.getFirstName());
                row.createCell(2).setCellValue(emp.getLastName());
                row.createCell(3).setCellValue(emp.getEmailId());
            }
            
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
		}
	}
	
}
