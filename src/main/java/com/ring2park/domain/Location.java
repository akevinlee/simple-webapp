package com.ring2park.domain;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.*;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.format.annotation.NumberFormat.Style;

/**
 * A Parking Location where a User may make Bookings.
 * @author Kevin A. Lee
 */
@Entity
@Table(name = "LOCATION")
public class Location implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "location_id")
	private Integer id;

	@NotEmpty(message = "A location name must be provided.")
	private String name;

	@NotEmpty(message = "A location address must be provided.")
	private String address;

	@NotEmpty(message = "A location city must be provided.")
	private String city;

	@NotEmpty(message = "A location state must be provided.")
	private String state;

	@NotEmpty(message = "A location Zip must be provided.")
	private String zip;

	@NotEmpty(message = "A Location country must be provided.")
	private String country;
	
	@NumberFormat(style=Style.CURRENCY)
	@Column(precision = 4, scale = 2)
	private BigDecimal price;
	
	@Size(max = 3)
	private String currency;

	public Location() {
		this.currency = "USD";
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	@Override
	public String toString() {
		return "Location(" + name + "," + address + "," + city + "," + zip + ")";
	}

}
